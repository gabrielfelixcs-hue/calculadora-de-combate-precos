# calculadora-de-combate-precos
Uma solução automatizada desenvolvida em **Google Apps Script (GAE)** e integrada ao **Google Sheets** para otimizar o processo de cobrir ofertas da concorrência no setor de tintometria.

## Funcionalidades Principais
- **Busca Automatizada por Zona/Estado:** Identifica instantaneamente os preços vigentes e margens de lucro dos produtos a partir do código LM.
- **Desconto Proporcional Inteligente:** Diferente de sistemas tradicionais que descontam apenas o valor da base, esta calculadora reduz proporcionalmente o valor de venda da base e de até 5 corantes simultaneamente para atingir o preço alvo (1% mais barato que a concorrência).
- **Relatório Estruturado:** Exporta os dados calculados de forma organizada em colunas independentes na aba de resultados, facilitando auditorias e análises futuras.

##  Tecnologias Utilizadas
- **Google Apps Script** (Lógica de back-end e integração com a API do Google Sheets)
- **HTML5 / CSS3 / JavaScript** (Interface do usuário responsiva e dinâmica)

##  Como Instalar e Executar
1. Crie uma planilha no Google Sheets com as abas nomeadas pelas siglas dos estados (ex: SP, PR, RN).
2. Vá em **Extensões** > **Apps Script**.
3. Copie os arquivos `Codigo.gs` e `index.html` deste repositório para o seu editor de script.
4. Clique em **Implantar** > **Nova implantação** como *App da Web*.
5. Defina o acesso para *"Qualquer pessoa"* ou configure conforme as diretrizes da sua organização.
