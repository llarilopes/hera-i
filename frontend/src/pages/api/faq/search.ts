import type { NextApiRequest, NextApiResponse } from 'next';

// URL do backend Laravel
// Using service name 'backend' works in Docker network; fallback to localhost when env var not set (for non-docker)
const BACKEND_URL = 'http://backend';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Apenas permitir método GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Obter a query da URL
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Parâmetro de busca inválido' });
    }

    // Log para depuração
    console.log('API FAQ Search - Recebido:', q);
    
    // Encaminhar a requisição para o backend Laravel
    const backendResponse = await fetch(`${BACKEND_URL}/faq/search?q=${encodeURIComponent(q)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
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
    console.log('API FAQ Search - Sucesso:', responseData);
    
    // Retornar a resposta do backend
    return res.status(backendResponse.status).json(responseData);
  } catch (error) {
    // Log de erro
    console.error('API FAQ Search - Erro:', error);
    
    // Retornar erro 500 para o cliente
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
