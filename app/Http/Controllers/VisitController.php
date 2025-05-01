<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SiteVisit;
use Illuminate\Support\Carbon;
use Laravel\Lumen\Routing\Controller as BaseController;

class VisitController extends BaseController
{
    public function registerStart(Request $request)
    {
        // Capturar dados do request
        $ip = $request->ip();
        $userAgent = $request->header('User-Agent');
        $deviceId = $request->input('device_id');
        $referrer = $request->input('referrer', 'direct');
        
        // Log para depuração
        \Log::info('Registrando visita:', [
            'device_id' => $deviceId,
            'ip' => $ip,
            'referrer' => $referrer
        ]);
        
        // Detectar sistema operacional, navegador e tipo de dispositivo
        $os = $this->detectOS($userAgent);
        $browser = $this->detectBrowser($userAgent);
        $deviceType = $this->detectDeviceType($userAgent);
        $isBot = $this->isBot($userAgent);
        
        $visit = SiteVisit::create([
            'device_id' => $deviceId,
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'os' => $os,
            'browser' => $browser,
            'device_type' => $deviceType,
            'referrer' => $referrer,
            'is_bot' => $isBot,
            'entry_time' => Carbon::now()
        ]);
        
        return response()->json([
            'success' => true,
            'visit_id' => $visit->id
        ]);
    }
    
    public function registerEnd(Request $request)
    {
        $this->validate($request, [
            'visit_id' => 'required|exists:site_visits,id'
        ]);
        
        $visit = SiteVisit::find($request->visit_id);
        $visit->exit_time = Carbon::now();
        $visit->save();
        
        return response()->json(['success' => true]);
    }
    
    private function detectOS($userAgent)
    {
        $os = 'Unknown';
        
        if (preg_match('/windows|win32|win64/i', $userAgent)) {
            $os = 'Windows';
        } elseif (preg_match('/macintosh|mac os x/i', $userAgent)) {
            $os = 'MacOS';
        } elseif (preg_match('/linux/i', $userAgent)) {
            $os = 'Linux';
        } elseif (preg_match('/android/i', $userAgent)) {
            $os = 'Android';
        } elseif (preg_match('/iphone|ipad|ipod/i', $userAgent)) {
            $os = 'iOS';
        }
        
        return $os;
    }
    
    private function detectBrowser($userAgent)
    {
        $browser = 'Unknown';
        
        if (preg_match('/chrome/i', $userAgent) && !preg_match('/edg/i', $userAgent)) {
            $browser = 'Chrome';
        } elseif (preg_match('/firefox/i', $userAgent)) {
            $browser = 'Firefox';
        } elseif (preg_match('/safari/i', $userAgent) && !preg_match('/chrome/i', $userAgent)) {
            $browser = 'Safari';
        } elseif (preg_match('/edg/i', $userAgent)) {
            $browser = 'Edge';
        } elseif (preg_match('/opera|opr/i', $userAgent)) {
            $browser = 'Opera';
        } elseif (preg_match('/msie|trident/i', $userAgent)) {
            $browser = 'Internet Explorer';
        }
        
        return $browser;
    }
    
    private function detectDeviceType($userAgent)
    {
        if (preg_match('/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i', $userAgent)) {
            return 'mobile';
        }
        
        return 'desktop';
    }

    public function registerTimeSpent(Request $request)
    {
        $this->validate($request, [
            'device_id' => 'required|string',
            'time_spent_seconds' => 'required|integer',
            'timestamp' => 'required|string'
        ]);
        
        // Buscar visita pelo device_id ou criar uma nova se não existir
        $visit = SiteVisit::where('device_id', $request->device_id)
                        ->orderBy('created_at', 'desc')
                        ->first();
                        
        if (!$visit) {
            // Se não encontrou uma visita, cria uma nova
            $visit = new SiteVisit();
            $visit->device_id = $request->device_id;
            $visit->entry_time = Carbon::now();
            $visit->user_agent = $request->header('User-Agent');
            $visit->ip_address = $request->ip();
            $visit->os = $this->detectOS($request->header('User-Agent'));
            $visit->browser = $this->detectBrowser($request->header('User-Agent'));
            $visit->device_type = $this->detectDeviceType($request->header('User-Agent'));
            $visit->is_bot = $this->isBot($request->header('User-Agent'));
        }
        
        // Atualizar o tempo de permanência
        $visit->time_spent_seconds = $request->time_spent_seconds;
        $visit->exit_time = Carbon::now();
        $visit->save();
        
        return response()->json([
            'success' => true,
            'visit_id' => $visit->id,
            'time_spent_seconds' => $visit->time_spent_seconds
        ]);
    }
    
    private function isBot($userAgent)
    {
        return preg_match('/bot|crawler|spider|crawling/i', $userAgent);
    }
}