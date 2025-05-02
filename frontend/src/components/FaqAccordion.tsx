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

interface FaqAccordionProps {
  data: FaqQuestion[];
  defaultOpenId?: string;
  scrollRef?: React.Ref<HTMLDivElement>;
}

// Função para ordenar as perguntas por popularidade
const sortQuestions = (questions: FaqQuestion[]) => {
  return [...questions].sort((a, b) => {
    // Primeiro critério: mais likes no topo
    if (b.likes !== a.likes) return b.likes - a.likes;
    // Segundo critério: menos dislikes no topo
    if (a.dislikes !== b.dislikes) return a.dislikes - b.dislikes;
    // Terceiro critério: ordem alfabética
    return a.question.localeCompare(b.question);
  });
};

const FaqAccordion: React.FC<FaqAccordionProps> = ({ data, defaultOpenId, scrollRef }) => {
  const [questions, setQuestions] = useState<FaqQuestion[]>(() => sortQuestions(data));

  useEffect(() => {
    setQuestions(sortQuestions(data));
    
    // Garantir que o defaultOpenId seja aplicado corretamente
    if (defaultOpenId && data.length > 0) {
      // Verificar se o ID existe nos dados
      const questionExists = data.some(q => q.id.toString() === defaultOpenId);
      if (!questionExists) {
        console.warn(`Pergunta com ID ${defaultOpenId} não encontrada nos dados`);
      }
    }
  }, [data, defaultOpenId]);
  const [voteMap, setVoteMap] = useState<VoteMap>({});
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    let id = localStorage.getItem('deviceId') || '';
    id = id || uuidv4();
    localStorage.setItem('deviceId', id);
    setDeviceId(id);

    const saved = localStorage.getItem('faqVotes');
    if (saved) setVoteMap(JSON.parse(saved));
  }, []);

  // Estado controlado para item aberto
  const [openId, setOpenId] = useState<string | undefined>(defaultOpenId);
  useEffect(() => {
    setOpenId(defaultOpenId);
  }, [defaultOpenId]);

  // Função para registrar clique na pergunta
  const registerClick = (qid: number) => {
    // Enviar clique para a API
    fetch('http://localhost:8000/faq/click', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:3001'
      },
      mode: 'cors',
      body: JSON.stringify({
        faq_question_id: qid,
        timestamp: new Date().toISOString(),
      }),
    }).catch(error => {
      console.warn('Erro ao registrar clique na API:', error);
    });
  };

  const handleVote = (qid: number, reaction: 'like' | 'dislike') => {
    // Se já votou igual, não faz nada
    if (voteMap[qid] === reaction) return;

    // Atualiza o estado local
    setVoteMap(prev => {
      const newMap = { ...prev, [qid]: reaction };
      localStorage.setItem('faqVotes', JSON.stringify(newMap));
      return newMap;
    });

    // Atualiza o contador de votos
    setQuestions(prev => {
      const updatedQuestions = prev.map(q => {
        if (q.id !== qid) return q;

        // Se já votou diferente, remove o voto anterior
        const prevVote = voteMap[qid];
        if (prevVote && prevVote !== reaction) {
          return {
            ...q,
            [reaction + 's']: q[reaction + 's' as 'likes' | 'dislikes'] + 1,
            [prevVote + 's']: Math.max(0, q[prevVote + 's' as 'likes' | 'dislikes'] - 1)
          };
        }

        // Novo voto
        return {
          ...q,
          [reaction + 's']: q[reaction + 's' as 'likes' | 'dislikes'] + 1
        };
      });
      
      // Ordenar as perguntas após atualizar os votos
      return sortQuestions(updatedQuestions);
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
          <Accordion.Root type="single" collapsible value={openId} onValueChange={setOpenId} className="accordion-container">
            {questions.length === 0 && (
              <div style={{textAlign: 'center', color: '#888', margin: '40px 0'}}>Nenhuma pergunta encontrada.</div>
            )}
            {questions.map(q => (
              <Accordion.Item
                key={q.id}
                value={String(q.id)}
                id={`faq-item-${q.id}`}
                ref={q.id.toString() === defaultOpenId ? scrollRef : undefined}
                className="faq-item"
                style={{ scrollMarginTop: '190px' }}
              >
                <Accordion.Header className="faq-header">
                  <Accordion.Trigger 
                    className="faq-trigger" 
                    onClick={() => registerClick(q.id)}
                  >
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
                    <div dangerouslySetInnerHTML={{ __html: q.answer }} className="faq-answer"></div>
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
