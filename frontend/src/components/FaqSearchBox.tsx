import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { useRouter } from 'next/router';
import { Combobox } from '@headlessui/react';

interface FaqQuestion {
  id: number;
  question: string;
  answer: string;
}

type SearchResult = { id: number; question: string; snippet: string };

const FaqSearchBox = forwardRef<HTMLInputElement>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allQuestions, setAllQuestions] = useState<FaqQuestion[]>([]);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const router = useRouter();
  
  // Carregar todas as perguntas uma vez ao montar o componente
  useEffect(() => {
    async function loadQuestions() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/faq/questions`);
        if (res.ok) {
          const questions: FaqQuestion[] = await res.json();
          setAllQuestions(questions);
        }
      } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadQuestions();
  }, []);

  // Função para normalizar texto (remover acentos)
  const normalizeText = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  // Função para extrair o primeiro parágrafo sem tags HTML
  const extractFirstParagraph = (html: string): string => {
    // Remove tags HTML
    const textOnly = html.replace(/<[^>]*>/g, '');
    
    // Pega o primeiro parágrafo ou até 100 caracteres
    const firstParagraph = textOnly.split('\n')[0];
    if (firstParagraph.length <= 100) return firstParagraph;
    
    return firstParagraph.substring(0, 100) + '...';
  };

  // Implementação de debounce
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const debouncedSearch = useCallback((val: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    debounceTimeout.current = setTimeout(() => {
      if (val.length < 2) {
        setResults([]);
        return;
      }
      
      // Normalizar a consulta para ser insensível a acentos
      const normalizedQuery = normalizeText(val);
      
      // Filtrar as perguntas com base na consulta usando os dados já carregados
      const filtered = allQuestions.filter((q) => {
        const normalizedQuestion = normalizeText(q.question);
        const normalizedAnswer = q.answer ? normalizeText(q.answer) : '';
        
        return normalizedQuestion.includes(normalizedQuery) || 
               normalizedAnswer.includes(normalizedQuery);
      });
      
      // Adicionar snippet para exibição (primeiro parágrafo sem tags)
      const resultsWithSnippet = filtered.map((q) => ({
        ...q,
        snippet: q.answer ? extractFirstParagraph(q.answer) : ''
      }));
      
      setResults(resultsWithSnippet);
    }, 300); // 300ms de debounce
  }, [allQuestions]);

  function handleChange(val: string) {
    setQuery(val);
    debouncedSearch(val);
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="section-title text-3xl font-bold text-purple-800 mb-2">Perguntas Frequentes <span style={{ color: '#a3ff00' }}>inteligentes</span></h2>
        <p className="text-gray-600" style={{ marginTop: '10px', marginBottom: '10px' }}>Encontre respostas para as dúvidas mais comuns sobre nossos serviços e soluções.</p>
      </div>
      
      <div className="relative w-full">
        <Combobox as="div" value={selectedItem} by="id" onChange={(item: SearchResult) => {
          if (item) {
            setSelectedItem(item);
            setQuery(item.question);
            setResults([]);
            router.push(`/faq?id=${item.id}`);
          }
        }} className="relative w-full">
          <div className="relative">
            {/* Ícone de lupa já está presente abaixo, remover duplicidade */}
            
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Ícone de lupa SVG inline */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </span>
              <Combobox.Input
                ref={inputRef}
                className="busca-faq w-full pl-12 pr-4 py-4 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm text-lg bg-white placeholder-gray-400"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSelectedItem(null); // reset seleção ao digitar
                  handleChange(event.target.value);
                }}
                displayValue={(item: SearchResult) => item ? item.question : query}
                placeholder="Digite sua dúvida aqui..."
                autoComplete="off"
                aria-label="Buscar perguntas frequentes"
              />
            </div>
          </div>
          
          {isLoading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-700"></div>
            </div>
          )}
          
          {results.length > 0 && (
            <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setResults([])}></div>
          )}
          
          {results.length > 0 && (
            <div style={{ backgroundColor: '#ffffff' }} className="absolute z-50 w-full mt-2 rounded-lg shadow-xl border-2 border-purple-200 overflow-hidden">
              <Combobox.Options className="max-h-80 md:max-h-96 overflow-y-auto w-full bg-white focus:outline-none" style={{ maxHeight: '24rem' }} >
                {results.map(r => (
                  <Combobox.Option
                    key={r.id}
                    value={r}
                    className={({ active }: { active: boolean }) =>
                      `cursor-pointer select-none p-4 ${active ? 'bg-purple-100 text-purple-900' : 'bg-white text-gray-900'} border-b border-purple-100 hover:bg-purple-50`}
                  >
                    {({ active, selected }: { active: boolean; selected: boolean }) => (
  <div className={`transition-all duration-150 rounded ${active ? 'bg-[#f3e8ff]' : 'bg-white'}`}> 
    <div
      className={`p-2 rounded ${active || selected ? 'ring-2 ring-purple-600' : ''}`}
      style={{ backgroundColor: active ? '#c9b8ff' : '#a3ff00' }}
    >
      <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#000000' }}>
        {r.question}
      </span>
    </div>
    <div className={`mt-2 border-t border-gray-100 pt-2 ${active ? 'bg-[#f3e8ff]' : ''}`}>
      <span className="block text-sm text-gray-600 p-1 rounded" style={{ backgroundColor: active ? '#f3e8ff' : 'white' }}>
        {r.snippet}
      </span>
    </div>
  </div>
)}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          )}
          
          {query.length >= 2 && results.length === 0 && !isLoading && (
            <div className="absolute z-50 mt-2 w-full rounded-lg border-2 border-gray-200 p-4 shadow-xl" style={{ backgroundColor: '#ffffff' }}>
              <p className="text-center text-gray-500" style={{ backgroundColor: '#ffffff' }}>Nenhum resultado encontrado para "{query}"</p>
            </div>
          )}
        </Combobox>
        
        <div className="mt-4 text-center text-sm text-gray-500" style={{ marginTop: '10px' }}>
          <p>Experimente buscar por: "Ravi", "tecnologias", "equipe"</p>
        </div>
      </div>
    </div>
  );
});

export default FaqSearchBox;
