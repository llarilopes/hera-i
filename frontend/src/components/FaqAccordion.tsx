import * as Accordion from '@radix-ui/react-accordion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface FaqQuestion {
  id: number;
  question: string;
  answer: string;
  likes: number;
  dislikes: number;
}

interface VoteMap {
  [key: number]: 'like' | 'dislike';
}

const FaqAccordion = () => {
  const [questions, setQuestions] = useState<FaqQuestion[]>([]);
  const [voteMap, setVoteMap] = useState<VoteMap>({});
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    let id = localStorage.getItem('deviceId') || '';
    id = id || uuidv4();
    localStorage.setItem('deviceId', id);
    setDeviceId(id);

    const saved = localStorage.getItem('faqVotes');
    if (saved) setVoteMap(JSON.parse(saved));

    // Dados iniciais para exibir enquanto a API não responde
    const initialQuestions: FaqQuestion[] = [
      {
        id: 1,
        question: 'Por que a HeRa-i não tem grande presença nas redes sociais?',
        answer: 'A HeRa-i valoriza mais o relacionamento com os clientes do que a autopromoção. Por isso, prefere focar totalmente em cada projeto.',
        likes: 0,
        dislikes: 0
      },
      {
        id: 2,
        question: 'Quantas empresas a HeRa-i já atendeu?',
        answer: 'Embora não haja um registro formal de todos os clientes, principalmente dos primeiros anos, estima-se que a HeRa-i já tenha prestado serviços para cerca de 100 empresas.',
        likes: 0,
        dislikes: 0
      },
      {
        id: 3,
        question: 'De onde são os clientes atendidos?',
        answer: 'A HeRa-i possui um histórico de atendimento a empresas em diversos estados e cidades brasileiras, além de clientes internacionais.',
        likes: 0,
        dislikes: 0
      }
    ];
    
    setQuestions(initialQuestions);
    
    // Tentar buscar da API com configurações CORS
    fetch('http://localhost:8000/faq/questions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:3001'
      },
      mode: 'cors'
    })
      .then(res => res.json())
      .then((data: FaqQuestion[]) => {
        if (data && Array.isArray(data)) {
          setQuestions(data);
        }
      })
      .catch(error => {
        console.warn('Erro ao buscar perguntas da API, usando dados iniciais:', error);
      });
  }, []);

  const handleVote = (qid: number, reaction: 'like' | 'dislike') => {
    if (voteMap[qid] === reaction) return;
    const prevReaction = voteMap[qid];
    const updatedMap = { ...voteMap, [qid]: reaction };
    setVoteMap(updatedMap);
    localStorage.setItem('faqVotes', JSON.stringify(updatedMap));

    setQuestions(prev => {
      const cloned = prev.map(q => {
        if (q.id !== qid) return q;
        let { likes, dislikes } = q;
        if (prevReaction === 'like') likes--;        
        if (prevReaction === 'dislike') dislikes--;  
        if (reaction === 'like') likes++;
        if (reaction === 'dislike') dislikes++;
        return { ...q, likes, dislikes };
      });
      return cloned.sort((a, b) => {
        if (b.likes !== a.likes) return b.likes - a.likes;
        if (a.dislikes !== b.dislikes) return a.dislikes - b.dislikes;
        return 0;
      });
    });

    // Tentar enviar voto para a API com configurações CORS
    fetch('http://localhost:8000/faq/vote', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:3001'
      },
      mode: 'cors',
      body: JSON.stringify({
        faq_question_id: qid,
        reaction,
        user_agent: navigator.userAgent,
        device_id: deviceId,
        timestamp: new Date().toISOString(),
      }),
    }).catch(error => {
      console.warn('Erro ao registrar voto na API:', error);
    });
  };

  return (
    <section id="faq" className="faq">
      <div className="container">
        <h2 className="section-title">Perguntas Frequentes</h2>
        <div className="faq-container">
          <Accordion.Root type="single" collapsible className="accordion-container">
            {questions.map(q => (
              <Accordion.Item key={q.id} value={String(q.id)} className="faq-item">
                <Accordion.Header className="faq-header">
                  <Accordion.Trigger className="faq-trigger">
                    {q.question}
                  </Accordion.Trigger>
                  <div className="faq-vote-buttons">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleVote(q.id, 'like'); }}
                      className={`vote-button like ${voteMap[q.id] === 'like' ? 'active' : ''}`}
                      aria-label="Like"
                    >
                      <ThumbsUp size={18} /> <span>{q.likes}</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleVote(q.id, 'dislike'); }}
                      className={`vote-button dislike ${voteMap[q.id] === 'dislike' ? 'active' : ''}`}
                      aria-label="Dislike"
                    >
                      <ThumbsDown size={18} />
                    </button>
                  </div>
                </Accordion.Header>
                <Accordion.Content className="faq-content">
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p>{q.answer}</p>
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
