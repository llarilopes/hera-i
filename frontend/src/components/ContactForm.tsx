import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Verificar se a URL contém a âncora #contact e rolar até ela
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#contact') {
        setTimeout(() => {
          const contactElement = document.getElementById('contact');
          if (contactElement) {
            contactElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    };
    
    // Executar imediatamente
    handleHashChange();
    
    // Adicionar event listener para capturar mudanças na URL
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-form">
          <h2 className="contact-title">Pronto para revolucionar seu projeto?</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input type="text" id="name" className="form-control" placeholder="Seu nome" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" className="form-control" placeholder="seu@email.com" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input type="tel" id="phone" className="form-control" placeholder="(00) 00000-0000" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea id="message" className="form-control" placeholder="Como podemos ajudar?" required value={formData.message} onChange={handleChange} />
            </div>
            <button type="submit" className="form-button" disabled={status === 'loading'}>
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
            {status === 'success' && <p className="mt-4 text-green-500">Mensagem enviada com sucesso!</p>}
            {status === 'error' && <p className="mt-4 text-red-500">Erro ao enviar a mensagem. Tente novamente.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
