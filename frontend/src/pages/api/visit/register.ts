import type { NextApiRequest, NextApiResponse } from 'next';

// URL do backend Laravel
// Using service name 'backend' works in Docker network; fallback to localhost when env var not set (for non-docker)
const BACKEND_URL = 'http://backend';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Apenas permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Log para depuração
    console.log('API Visit Register - Recebido:', req.body);
    
    // Encaminhar a requisição para o backend Laravel
    const backendResponse = await fetch(`${BACKEND_URL}/visit/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    // Verificar se a resposta do backend foi bem-sucedida
    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('Erro ao encaminhar para o backend:', backendResponse.status, errorText);
      return res.status(backendResponse.status).json({ 
        error: 'Erro ao encaminhar para o backend', 
        status: backendResponse.status,
        details: errorText
      });
    }

    // Tentar obter a resposta como JSON
    let responseData;
    try {
      responseData = await backendResponse.json();
    } catch {
      // Se não for JSON, obter como texto
      responseData = { message: await backendResponse.text() };
    }

    // Log de sucesso
    console.log('API Visit Register - Sucesso:', responseData);
    
    // Retornar a resposta do backend
    return res.status(backendResponse.status).json(responseData);
  } catch (error) {
    // Log de erro
    console.error('API Visit Register - Erro:', error);
    
    // Retornar erro 500 para o cliente
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
