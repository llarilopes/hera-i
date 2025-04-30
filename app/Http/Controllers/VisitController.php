<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SiteVisit;
use Laravel\Lumen\Routing\Controller as BaseController;

class VisitController extends BaseController
{
    public function registerStart(Request $request)
    {
        $ip = $request->ip();
        $userAgent = $request->header('User-Agent');
        
        // Detectar sistema operacional, navegador e tipo de dispositivo
        $os = $this->detectOS($userAgent);
        $browser = $this->detectBrowser($userAgent);
        $deviceType = $this->detectDeviceType($userAgent);
        $isBot = $this->isBot($userAgent);
        
        $visit = SiteVisit::create([
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'os' => $os,
            'browser' => $browser,
            'device_type' => $deviceType,
            'is_bot' => $isBot,
            'entry_time' => now()
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
        $visit->exit_time = now();
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
    
    private function isBot($userAgent)
    {
        return preg_match('/bot|crawler|spider|crawling/i', $userAgent);
    }
}