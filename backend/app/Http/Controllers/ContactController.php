<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Mail;

class ContactController extends BaseController
{
    public function store(Request $request)
    {
        // Validação dos dados
        $data = $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'message' => 'required|string',
        ]);

        // Salvar no banco
        Contact::create($data);

        // Enviar e-mail para suporte
        $body = "Nova mensagem de contato:\n"
              . "Nome: {$data['name']}\n"
              . "Email: {$data['email']}\n"
              . "Telefone: {$data['phone']}\n\n"
              . "Mensagem:\n{$data['message']}";

        Mail::raw($body, function ($message) {
            $message->to('suporte@hera-i.com.br')
                    ->subject('Novo contato recebido');
        });

        return response()->json(['message' => 'Contato recebido com sucesso']);
    }
}
