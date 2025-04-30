<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FaqQuestionSeeder extends Seeder
{
    public function run()
    {
        $faqQuestions = [
            [
                'question' => 'Por que a HeRa-i não tem grande presença nas redes sociais?',
                'answer'   => 'A HeRa-i valoriza mais o relacionamento com os clientes do que a autopromoção. Por isso, prefere focar totalmente em cada projeto, mesmo que atenda apenas um único cliente por meses ou até anos, com total dedicação. A prioridade é garantir que cada entrega supere as expectativas. O compromisso é sempre com a qualidade da entrega e com a satisfação plena de quem está sendo atendido. Se você é o cliente da vez, pode ter certeza de que será tratado como prioridade máxima e estará no centro de toda a atenção e esforço da equipe, com dedicação exclusiva, foco e qualidade acima da média.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:01:00',
                'updated_at' => '2025-04-30 12:01:00',
            ],
            [
                'question' => 'Quantas empresas a HeRa-i já atendeu?',
                'answer'   => 'Embora não haja um registro formal de todos os clientes, principalmente dos primeiros anos, estima-se que a HeRa-i já tenha prestado serviços para cerca de 100 empresas. Aqui no site estão listadas aproximadamente 50 delas, e esse número cresce conforme os atendimentos são documentados e conforme a memória histórica da empresa é recuperada e atualizada.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:02:00',
                'updated_at' => '2025-04-30 12:02:00',
            ],
            [
                'question' => 'De onde são os clientes atendidos?',
                'answer'   => 'A HeRa-i possui um histórico de atendimento a empresas em diversos estados e cidades brasileiras, além de clientes internacionais. Já atuou em cidades como Belo Horizonte (MG), Contagem (MG), Divinópolis (MG), São José dos Campos (SP), Mogi das Cruzes (SP), São Paulo (SP), Florianópolis (SC), Aracaju (SE), Maceió (AL) e Cascavel (PR). No exterior, destaca-se o atendimento às empresas 2Mundos Inc (Carlsbad, California – EUA) e Flossmoor Montessori (Illinois – EUA).',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:03:00',
                'updated_at' => '2025-04-30 12:03:00',
            ],
            [
                'question' => 'O que significa “HeRa”?',
                'answer'   => 'Na mitologia grega, Hera é conhecida como a Rainha do Olimpo. É a deusa do casamento, da maternidade, da fidelidade, da monogamia e das bodas. Filha de Cronos e Reia, irmã e esposa de Zeus, Hera é uma figura central nas histórias gregas, muitas vezes envolvida em mitos sobre ciúmes, lealdade e proteção à família. Seu símbolo é o pavão, que representa vigilância, beleza e poder. Mas a HeRa-i tem outro significado: é a junção dos nomes Heloísa e Ravi, filhos da Lari e do Mr. Goose. Representam a nova geração da empresa, que já nasce com o propósito de continuar o legado iniciado pelos pais — um legado de criatividade, inteligência, inovação, visão de futuro e compromisso com resultados reais.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:04:00',
                'updated_at' => '2025-04-30 12:04:00',
            ],
            [
                'question' => 'Vocês já tiveram outro nome?',
                'answer'   => 'Sim. Assim como empresas renomadas evoluíram e mudaram de nome ao longo dos anos (por exemplo, o Facebook virou Meta e o Twitter virou X), a HeRa-i também passou por essa evolução (rebranding). A essência continua a mesma desde 1998, apenas mais experiente, madura, moderna e sintonizada com os novos tempos. Inclusive, alguns de seus clientes também mudaram de nome, e este site mantém no portfólio o nome original utilizado à época da prestação de serviço para preservar a autenticidade e o histórico fiel dos projetos.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:05:00',
                'updated_at' => '2025-04-30 12:05:00',
            ],
            [
                'question' => 'Quando e como tudo começou?',
                'answer'   => 'O primeiro projeto foi em 1998, com sistemas offline desenvolvidos em Microsoft Access e SQL e alguns pequenos trabalhos em HTML. Em 1999, a evolução veio com Visual Basic. Já em 2003, planilhas avançadas em Excel com e sem VBA passaram a ser o foco. A grande virada para o mundo web veio em 2009, quando surgiu o convite para criar uma rede social própria — o “Achei Meu Personal”, semelhante ao Orkut e Facebook da época, porém para um nicho específico, o público fitness — foi ali que a chave virou de vez para o mundo online. Desde então, a HeRa-i passou a atuar exclusivamente com soluções web.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:06:00',
                'updated_at' => '2025-04-30 12:06:00',
            ],
            [
                'question' => 'O que a HeRa-i já desenvolveu?',
                'answer'   => 'A lista é extensa e inclui desde soluções simples até projetos altamente complexos e desafiadores: sistemas para prefeituras (como o CTR-e para a cidade de São Paulo, por decreto do prefeito Bruno Covas à época); aplicativos móveis nativos (Android) e híbridos (iOS); redes sociais completas; sistemas web personalizados e plataformas SaaS; websites com diferentes tecnologias; e-commerces; intranets corporativas; aplicativos para impressoras multifuncionais e impressoras de etiquetas; planilhas avançadas que funcionam como sistemas completos; otimizações para motores de busca (SEO técnico) e Google Analytics; aplicações offline em Visual Basic e Access; apresentações interativas em PowerPoint; digitação e formatação profissional de currículos, trabalhos acadêmicos e livros (incluindo a formatação de um livro em hebraico referenciado publicamente pelo autor); trabalhos com hardware (venda de peças, montagem e manutenção de computadores e redes cabeadas); aulas presenciais e online de informática, com vídeos ainda disponíveis no YouTube; criações gráficas desde CorelDraw nos anos 90, passando por Photoshop e chegando às poderosas IAs atuais.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:07:00',
                'updated_at' => '2025-04-30 12:07:00',
            ],
            [
                'question' => 'Com quais tecnologias a HeRa-i trabalha ou já trabalhou?',
                'answer'   => 'Desde o passado: Access, Visual Basic, CorelDraw, Adobe Flash (descontinuado em 2020), HTML, CSS, C++, C, Android Nativo, sistemas standalone e instalações locais. No presente: Java, PHP, JavaScript, TypeScript, NativeScript, Python, .NET, Kotlin, Vue .js, React .js, AngularJS, Node .js, jQuery, AJAX; frameworks Lumen, Laravel, Zend, CakePHP, CodeIgniter, Django, Flask; bancos de dados MySQL, PostgreSQL, MariaDB, MongoDB, Redis, SQL Server; infraestrutura com microsserviços, Kubernetes, Docker, Jenkins, Nginx, Git, Composer, Cloudflare, AWS, Google Cloud, servidores dedicados, compartilhados e na nuvem; CMS e e-commerce WordPress, Joomla, Drupal, Magento, WooCommerce, Wix; metodologias Agile, Scrum, Kanban, DevOps, TDD, CI/CD; competências extras em segurança da informação, performance, SEO técnico e APIs RESTful. Para o futuro: a empresa acompanha de perto o avanço das IAs, automações e integrações com LLMs, aplicando ferramentas modernas para otimizar processos e interfaces inteligentes.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:08:00',
                'updated_at' => '2025-04-30 12:08:00',
            ],
            [
                'question' => 'Quais são as formações da equipe?',
                'answer'   => 'A HeRa-i reúne uma base sólida de conhecimento e formação multidisciplinar: graduações em Teologia, Administração, Psicologia, Análise e Desenvolvimento de Sistemas e Banco de Dados; pós-graduações em Administração, Gestão Ágil, Inteligência Artificial e Análise de Dados; além de inúmeros cursos técnicos e complementares que vão desde Windows e Word até Docker, DevOps, Laravel e IA.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:09:00',
                'updated_at' => '2025-04-30 12:09:00',
            ],
            [
                'question' => 'É verdade que Ravi Felipe, com apenas 5 anos, já é desenvolvedor de games?',
                'answer'   => 'Sim, é verdade e isso é motivo de orgulho para a HeRa-i. Ravi é filho do casal fundador e desde bebê é incentivado ao contato com a tecnologia. Ele é um prodígio tecnológico que cresceu cercado por estímulos inteligentes. Com apenas 5 anos, já criou seu primeiro jogo digital em aulas de programação. Um dos vídeos mais marcantes do Ravi é quando, ainda sem falar direito, ele interage com a Alexa — vídeo disponível no Instagram dele (linkado na foto dele aqui no site). Desde muito cedo, Ravi interage com assistentes virtuais e lida sozinho, autodidata, com tecnologia. Aprendeu a escrever o próprio nome aos 2–3 anos e a ler entre 4 e 5 anos. É considerado um verdadeiro gênio mirim em expansão, e com o incentivo dos pais — Lipe e Lari — Ravi, com um futuro promissor, é a prova viva de que o futuro da tecnologia começa em casa.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:10:00',
                'updated_at' => '2025-04-30 12:10:00',
            ],
            [
                'question' => 'Como funciona o atendimento da HeRa-i?',
                'answer'   => 'Cada cliente é avaliado de forma individual e personalizada. A agenda da HeRa-i é seletiva e, muitas vezes, exclusiva: não atende qualquer projeto ou demanda. A prioridade é a sinergia com o propósito do cliente, o nível de desafio e o valor da entrega. Só são aceitos projetos que se alinham com a visão da empresa e com a disponibilidade da equipe. A HeRa-i trabalha sob demanda, com atendimento personalizado e foco total em cada cliente. A comunicação é direta, transparente e baseada em confiança.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:11:00',
                'updated_at' => '2025-04-30 12:11:00',
            ],
            [
                'question' => 'Vocês trabalham com contratos e emissão de nota fiscal?',
                'answer'   => 'Depende da demanda. Em muitos casos, sim — principalmente em projetos formais e contínuos. Mas nem todos os serviços exigem contrato ou emissão de nota fiscal. A HeRa-i se adapta à realidade de cada cliente, mantendo sempre transparência, confiança e profissionalismo. Além disso, exerce trabalhos voluntários atendendo a ONGs e projetos sociais de forma filantrópica e altruísta.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:12:00',
                'updated_at' => '2025-04-30 12:12:00',
            ],
            [
                'question' => 'A HeRa-i trabalha com inteligência artificial?',
                'answer'   => 'Sim. Além de acompanhar de perto a evolução da IA, a HeRa-i já aplica tecnologias como automações com LLMs, análise de dados inteligentes e integração com APIs modernas para transformar a operação dos clientes com inovação real.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:13:00',
                'updated_at' => '2025-04-30 12:13:00',
            ],
            [
                'question' => 'A HeRa-i desenvolve projetos confidenciais?',
                'answer'   => 'Sim. Projetos com cláusula de confidencialidade (NDA) são comuns e respeitados com absoluto rigor.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:14:00',
                'updated_at' => '2025-04-30 12:14:00',
            ],
            [
                'question' => 'A HeRa-i atende demandas emergenciais ou correções de urgência?',
                'answer'   => 'Depende da disponibilidade de agenda e da complexidade do caso. Em muitos momentos, a empresa atua como “bombeiro de sistemas”, resolvendo problemas que outras equipes não conseguiram resolver.',
                'clicks'   => 0,
                'created_at' => '2025-04-30 12:15:00',
                'updated_at' => '2025-04-30 12:15:00',
            ],
        ];

        DB::table('faq_questions')->insert($faqQuestions);
    }
}
