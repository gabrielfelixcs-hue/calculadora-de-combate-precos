function doGet() {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Calculadora de Combate V3')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function listarZonas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheets().map(s => s.getName()).filter(n => n !== "Resultados");
}

function buscarDadosCompletos(lm, zona) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(zona);
    if (!sheet) return { erro: true, msg: "Aba não encontrada" };
    const dados = sheet.getDataRange().getValues();
    
    for (var i = 1; i < dados.length; i++) {
      if (String(dados[i][1]).trim() === String(lm).trim()) {
        let valorVenda = dados[i][5];  // Coluna F
        let valorMargem = dados[i][6]; // Coluna G
        let precoLimpo = 0;
        let margemLimpa = 0;
        
        if (typeof valorVenda === 'number') {
          precoLimpo = valorVenda;
        } else if (valorVenda) {
          let txt = valorVenda.toString().replace("R$", "").trim();
          if (txt.indexOf(',') !== -1 && txt.indexOf('.') !== -1) {
            txt = txt.replace(/\./g, "").replace(",", ".");
          } else {
            txt = txt.replace(",", ".");
          }
          precoLimpo = parseFloat(txt) || 0;
        }
        
        if (typeof valorMargem === 'number') {
          margemLimpa = valorMargem < 1 && valorMargem > 0 ? valorMargem * 100 : valorMargem;
        } else if (valorMargem) {
          let txtM = valorMargem.toString().replace("%", "").trim();
          if (txtM.indexOf(',') !== -1 && txtM.indexOf('.') !== -1) {
            txtM = txtM.replace(/\./g, "").replace(",", ".");
          } else {
            txtM = txtM.replace(",", ".");
          }
          margemLimpa = parseFloat(txtM) || 0;
          if (margemLimpa < 1 && margemLimpa > 0 && valorMargem.toString().indexOf('%') === -1) {
            margemLimpa = margemLimpa * 100;
          }
        }

        return {
          descricao: dados[i][2], // Coluna C
          precoVenda: precoLimpo,
          margem: margemLimpa,
          erro: false
        };
      }
    }
    return { erro: true, msg: "LM não encontrado" };
  } catch (e) {
    return { erro: true, msg: e.toString() };
  }
}

function salvarNaPlanilha(dados) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Resultados");
  
  if (!sheet) {
    sheet = ss.insertSheet("Resultados");
    // Cria o cabeçalho organizado caso a aba acabe de ser criada
    sheet.appendRow([
      "Data/Hora", "Zona", "Nome da Cor", "Preço Concorrente", "Preço Alvo Total", 
      "LM Base", "Novo Preço Base", 
      "LM Corante 1", "Novo Preço C1/ML", 
      "LM Corante 2", "Novo Preço C2/ML", 
      "LM Corante 3", "Novo Preço C3/ML", 
      "LM Corante 4", "Novo Preço C4/ML",
      "LM Corante 5", "Novo Preço C5/ML"
    ]);
  }
  
  let linhaParaInserir = [
    new Date(), 
    dados.zona, 
    dados.nomeCor, 
    parseFloat(dados.pConc), 
    parseFloat(dados.precoAlvo), 
    dados.lmBase, 
    parseFloat(dados.precoBaseSugerido)
  ];
  
  for (let i = 0; i < 5; i++) {
    if (dados.corantesLista && dados.corantesLista[i]) {
      linhaParaInserir.push(dados.corantesLista[i].lm);
      linhaParaInserir.push(parseFloat(dados.corantesLista[i].novoPrecoML));
    } else {
      linhaParaInserir.push(""); // LM vazio
      linhaParaInserir.push(""); // Preço vazio
    }
  }
  
  sheet.appendRow(linhaParaInserir);
  return "Transferido para as colunas estruturadas com sucesso!";
}
