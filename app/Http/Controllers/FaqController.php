<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FaqQuestion;
use App\Models\FaqVote;
use Laravel\Lumen\Routing\Controller as BaseController;

class FaqController extends BaseController
{
    public function getQuestions()
    {
        $questions = FaqQuestion::all()->map(function ($question) {
            return [
                'id' => $question->id,
                'question' => $question->question,
                'answer' => $question->answer,
                'likes' => $question->votes()->where('reaction', 'like')->count(),
                'dislikes' => $question->votes()->where('reaction', 'dislike')->count()
            ];
        });

        return response()->json($questions);
    }

    public function registerClick(Request $request)
    {
        $this->validate($request, [
            'faq_question_id' => 'required|exists:faq_questions,id'
        ]);

        $question = FaqQuestion::find($request->faq_question_id);
        $question->clicks += 1;
        $question->save();

        return response()->json(['success' => true]);
    }

    public function registerVote(Request $request)
    {
        $this->validate($request, [
            'faq_question_id' => 'required|exists:faq_questions,id',
            'reaction' => 'required|in:like,dislike',
            'device_id' => 'nullable|string'
        ]);

        $ip = $request->ip();
        $userAgent = $request->header('User-Agent');
        $deviceId = $request->device_id;
        $questionId = $request->faq_question_id;

        // Verificar se já existe um voto deste usuário para esta pergunta
        $existingVote = FaqVote::where('faq_question_id', $questionId)
            ->where('ip_address', $ip)
            ->where('user_agent', $userAgent);
            
        if ($deviceId) {
            $existingVote = $existingVote->where('device_id', $deviceId);
        }
        
        $existingVote = $existingVote->first();

        if ($existingVote) {
            // Se já votou com a mesma reação, não faz nada
            if ($existingVote->reaction === $request->reaction) {
                return response()->json(['success' => true, 'message' => 'Vote already registered']);
            }

            // Se votou com reação diferente, atualiza
            $existingVote->reaction = $request->reaction;
            $existingVote->save();
        } else {
            // Se não votou, cria um novo voto
            FaqVote::create([
                'faq_question_id' => $questionId,
                'reaction' => $request->reaction,
                'ip_address' => $ip,
                'user_agent' => $userAgent,
                'device_id' => $deviceId
            ]);
        }

        return response()->json(['success' => true]);
    }
}