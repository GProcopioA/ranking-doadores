import React, { useState, useMemo } from "react";

// =========================================================================
// 1. CONFIGURAÇÃO DOS ITENS, PONTUAÇÃO E CORES
// =========================================================================
const ITEM_POINTS = {
  "Pacote de fralda (G)": 30,
  "Pacote de fralda (P)": 30,
  "Sacola Brinquedos (1 Unidade)": 20,
  "Macarrão (1 Pacote)": 5,
  "Leite (1 Litro)": 5,
  "Feijão (1 Kg)": 5,
  "Arroz (1 Kg)": 5,
  "Farinha de Mandioca (1 Unidade)": 3,
  "Sabonete Líquido (1 Unidade)": 3,
  "Lenço Umedecido (1 Pacote)": 3,
  "Molho de Tomate (1 Pacote)": 3,
  "Farinha de Trigo (1 Kg)": 3,
  "Desifetante (1 Unidade)": 3,
  "Detergente (1 Unidade)": 3,
  "Veja (1 Unidade)": 3,
  "Óleo (1 Litro)": 3,
  "Açúcar (1 Kg)": 3,
  "Café (1 Kg)": 3,
  "Sal (1 Kg)": 3,
  "Dinheiro (1 Real)": 1,
};

// Paleta de Cores consistente para as tags e o gráfico de barras
const ITEM_COLORS = {
  "Pacote de fralda (G)": "#ff6384", // Rosa
  "Pacote de fralda (P)": "#fd6384", // Rosa
  "Feijão (1 Kg)": "#36a2eb", // Azul
  "Lenço Umedecido (1 Pacote)": "#ffcd56", // Amarelo
  "Macarrão (1 Pacote)": "#4bc0c0", // Ciano
  "Açúcar (1 Kg)": "#9966ff", // Roxo
  "Sacola Brinquedos (1 Unidade)": "#764e28",
  "Leite (1 Litro)": "#cd6c12",
  "Arroz (1 Kg)": "#0b290c",
  "Farinha de Mandioca (1 Unidade)": "#9044ca",
  "Sabonete Líquido (1 Unidade)": "#a16161",
  "Molho de Tomate (1 Pacote)": "#5a0404",
  "Farinha de Trigo (1 Kg)": "#45f7bf",
  "Desifetante (1 Unidade)": "#4845f7",
  "Detergente (1 Unidade)": "#ccff00",
  "Veja (1 Unidade)": "#190379",
  "Óleo (1 Litro)": "#67470b",
  "Café (1 Kg)": "#381a0a",
  "Sal (1 Kg)": "#f0f2f1",
  "Dinheiro (1 Real)": "#11d73f",
};

// =========================================================================
// 2. DADOS BRUTOS (Simulação do seu arquivo CSV)
//    Formato: "Nome do Doador, Nome do Item, Quantidade"
//    ADICIONE SEUS DADOS AQUI.
// =========================================================================
const RAW_DONATION_DATA = [
  // Exemplo de Doações:
  "Bruno,Pacote de fralda (G),1",
  "Bruno,Feijão (1 Kg),1",
  "Bruno,Lenço Umedecido (1 Pacote),1",
  "Rafael,Pacote de fralda (G),1",
  "Rafael,Feijão (1 Kg),1",
  "Rafael,Lenço Umedecido (1 Pacote),1",
  "Biel Lucas,Macarrão (1 Pacote),3",
  "Biel Lucas,Açúcar (1 Kg),1",
  "Biel Lucas,Leite (1 Litro),1",
  "Renan,Pacote de fralda (P),1",
  "Renan,Feijão (1 Kg),1",
  "Renan,Lenço Umedecido (1 Pacote),1",
  "Belini,Arroz (1 Kg),10",
  "Belini,Feijão (1 Kg),3",
  "Belini,Óleo (1 Litro),2",
  "Belini,Leite (1 Litro),4",
  "Belini,Açúcar (1 Kg),4",
  "Belini,Macarrão (1 Pacote),4",
  "Andrew,Pacote de fralda (G),1",
  "Andrew,Lenço Umedecido (1 Pacote),3",
  "Andrew,Sabonete Líquido (1 Unidade),2",
  "Andrew,Sacola Brinquedos (1 Unidade),1",
  "Wata,Farinha de Trigo (1 Kg),1",
  "Wata,Açúcar (1 Kg),1",
  "Wata,Macarrão (1 Pacote),4",
  "Wata,Óleo (1 Litro),2",
  "Caio,Leite (1 Litro),1",
  "Caio,Macarrão (1 Pacote),1",
  "Caio,Açúcar (1 Kg),1",
  "Caio,Detergente (1 Unidade),1",
  "Caio,Veja (1 Unidade),1",
  "Marquinhos,Feijão (1 Kg),1",
  "Marquinhos,Detergente (1 Unidade),1",
  "Matheus,Arroz (1 Kg),5",
  "Matheus,Dinheiro (1 Real),75",
  "Rodrigo,Leite (1 Litro),2",
  "Rodrigo,Macarrão (1 Pacote),2",
  "Rodrigo,Desifetante (1 Unidade),1",
  "Vinicius,Arroz (1 Kg),10",
  "Vinicius,Açúcar (1 Kg),2",
  "Vinicius,Feijão (1 Kg),2",
  "Vinicius,Café (1 Kg),1",
  "Vinicius,Macarrão (1 Pacote),1",
  "Vinicius,Molho de Tomate (1 Pacote),1",
  "Vinicius,Farinha de Trigo (1 Kg),1",
  "Vinicius,Farinha de Mandioca (1 Unidade),1",
  "Vinicius,Sal (1 Kg),1",
  "Vinicius,Óleo (1 Litro),2",
  "Vilela,Arroz (1 Kg),1",
  "Vilela,Desifetante (1 Unidade),1",
  "Vilela,Leite (1 Litro),1",
  "Carriel,Dinheiro (1 Real),50",
  "Rato,Dinheiro (1 Real),30",
  "Gustavo,Feijão (1 Kg),2",
  "Gustavo,Arroz (1 Kg),1",
  "Gustavo,Lenço Umedecido (1 Pacote),1",
  "Gustavo,Pacote de fralda (G),1",
  "Gustavo,Macarrão (1 Pacote),1",
  "Gustavo,Dinheiro (1 Real),100",
  "Adão,Dinheiro (1 Real),50",
  "Luiz,Dinheiro (1 Real),50",
  "Galdino,Pacote de fralda (P),2",
  "Larissa,Lenço Umedecido (1 Pacote),4",
  "Feh Ribas,Dinheiro (1 Real),40",
  "Yago,Dinheiro (1 Real),50",
];

// =========================================================================
// 3. FUNÇÕES DE PROCESSAMENTO DE DADOS
// =========================================================================

/**
 * Processa os dados brutos para gerar o ranking de doadores e as estatísticas de itens.
 */
const processDonationData = () => {
  const donorMap = new Map();
  const itemStats = new Map();

  // 1. Processar cada linha de doação
  RAW_DONATION_DATA.forEach((line) => {
    const parts = line.split(",").map((p) => p.trim());
    if (parts.length < 3) return;

    const [donorName, itemName, quantityStr] = parts;
    const quantity = parseInt(quantityStr, 10);
    const pointsPerItem = ITEM_POINTS[itemName] || 0;

    if (quantity > 0 && pointsPerItem > 0) {
      const totalPoints = quantity * pointsPerItem;

      // Atualizar Doador (Ranking)
      let donorData = donorMap.get(donorName) || { points: 0, itemCounts: {} };

      donorData.points += totalPoints;
      donorData.itemCounts[itemName] =
        (donorData.itemCounts[itemName] || 0) + quantity;

      donorMap.set(donorName, donorData);

      // Atualizar Estatísticas de Itens
      let stats = itemStats.get(itemName) || { totalQtd: 0, totalPontos: 0 };
      stats.totalQtd += quantity;
      stats.totalPontos += totalPoints;
      itemStats.set(itemName, stats);
    }
  });

  // 2. Formatar Ranking (MODIFICADO: 'items' agora é um array de objetos)
  const ranking = Array.from(donorMap.entries())
    .map(([name, data]) => ({
      name,
      points: data.points,
      // Criar lista de itens doados para exibição como um array de objetos
      items: Object.entries(data.itemCounts).map(([name, quantity]) => ({
        name,
        quantity,
      })),
    }))
    .sort((a, b) => b.points - a.points); // Ordenar por pontos (desc)

  // 3. Formatar Estatísticas de Itens
  const itemConfig = Object.entries(ITEM_POINTS)
    .map(([name, points]) => {
      const stats = itemStats.get(name) || { totalQtd: 0, totalPontos: 0 };
      return {
        name,
        pointsValue: points,
        totalQtd: stats.totalQtd,
        totalPontos: stats.totalPontos,
        color: ITEM_COLORS[name] || "#ccc", // Adiciona a cor para fácil acesso
      };
    })
    .sort((a, b) => b.totalQtd - a.totalQtd);

  return { ranking, itemConfig };
};

// =========================================================================
// 4. COMPONENTES DE VISUALIZAÇÃO
// =========================================================================

/**
 * Novo Componente para exibir o Item Doados como uma Tag Colorida
 */
const ItemTag = ({ name, quantity }) => {
  const color = ITEM_COLORS[name] || "#ccc"; // Pega a cor do mapa
  return (
    <span className="item-tag" style={{ backgroundColor: color }}>
      {name}: {quantity}
    </span>
  );
};

/**
 * Componente para exibir o Ranking de Doadores.
 */
const RankingTable = ({ ranking }) => (
  <div className="table-container">
    <h2 className="section-title">Ranking de Doadores</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Doador</th>
          <th>Pontos Acumulados</th>
          <th>Itens Doados (Qtd.)</th>
        </tr>
      </thead>
      <tbody>
        {ranking.map((donor, index) => (
          <tr key={donor.name}>
            <td className="rank-cell">
              {index === 0 && <span className="rank-badge gold">1º</span>}
              {index === 1 && <span className="rank-badge silver">2º</span>}
              {index === 2 && <span className="rank-badge bronze">3º</span>}
              {index >= 3 && (
                <span className="rank-badge default">{index + 1}º</span>
              )}
            </td>
            <td>{donor.name}</td>
            <td data-label="Pontos">{donor.points.toLocaleString("pt-BR")}</td>
            {/* MODIFICADO: Renderiza as tags coloridas */}
            <td data-label="Itens" className="item-tags-cell">
              {donor.items.map((item, i) => (
                <ItemTag key={i} name={item.name} quantity={item.quantity} />
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {ranking.length === 0 && (
      <p className="no-data">
        Nenhuma doação processada ainda. Adicione dados à RAW_DONATION_DATA.
      </p>
    )}
  </div>
);

/**
 * Componente para exibir Estatísticas e Gráfico de Itens.
 */
const ItemStats = ({ itemConfig }) => {
  const maxQtd = Math.max(...itemConfig.map((item) => item.totalQtd), 1); // Garante que não é zero

  return (
    <div className="stats-container">
      <h2 className="section-title">Estatísticas de Itens Arrecadados</h2>

      {/* Tabela de Referência de Pontuação por Item */}
      <h3 className="subtitle">Tabela de Referência: Pontos por Item</h3>
      <div className="table-container item-config-table">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Pontos por Unidade</th>
            </tr>
          </thead>
          <tbody>
            {itemConfig.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td data-label="Pontos">{item.pointsValue} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabela de Totais Arrecadados e Pontos Gerados */}
      <h3 className="subtitle">Total de Itens Arrecadados e Pontos Gerados</h3>
      <div className="table-container item-value-table">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Total Arrecadado</th>
              <th>Pontos Totais Gerados</th>
            </tr>
          </thead>
          <tbody>
            {itemConfig.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td data-label="Arrecadado">{item.totalQtd} un</td>
                <td data-label="Pontos Totais">
                  {item.totalPontos.toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gráfico Simples de Itens Mais Arrecadados */}
      <h3 className="subtitle">Itens Mais Arrecadados (Gráfico)</h3>
      <div className="bar-chart-container">
        {itemConfig.map((item, index) => (
          <div key={index} className="bar-item">
            <div className="bar-label">
              {item.name} ({item.totalQtd} un)
            </div>
            <div className="bar-wrapper">
              <div
                className="bar"
                // MODIFICADO: Define a cor da barra dinamicamente
                style={{
                  width: `${(item.totalQtd / maxQtd) * 100}%`,
                  backgroundColor: item.color,
                  background: item.color, // Força a cor sem gradiente padrão
                }}
              ></div>
            </div>
          </div>
        ))}
        {itemConfig.length === 0 && (
          <p className="no-data">Nenhum item configurado ou doado.</p>
        )}
      </div>
    </div>
  );
};

// =VEMENT
// 5. COMPONENTE PRINCIPAL (App)
// =========================================================================

const App = () => {
  const [view, setView] = useState("ranking"); // 'ranking' ou 'stats'

  // Use useMemo para processar os dados apenas quando as dependências mudarem (dados estáticos)
  const { ranking, itemConfig } = useMemo(() => processDonationData(), []);

  return (
    <div className="app-container">
      <h1>Ranking das Doações</h1>
      <p className="data-note"></p>

      {/* Navegação entre as Vistas */}
      <div className="tabs-container">
        <button
          className={view === "ranking" ? "tab-button active" : "tab-button"}
          onClick={() => setView("ranking")}
        >
          🏆 Ranking de Doadores
        </button>
        <button
          className={view === "stats" ? "tab-button active" : "tab-button"}
          onClick={() => setView("stats")}
        >
          📊 Informações das Doações
        </button>
      </div>

      <main className="content-area">
        {view === "ranking" ? (
          <RankingTable ranking={ranking} />
        ) : (
          <ItemStats itemConfig={itemConfig} />
        )}
      </main>
    </div>
  );
};

// =========================================================================
// 6. ESTILOS CSS (Sem Tailwind CSS, Apenas CSS Puro)
// =========================================================================

const styles = `
/* Variáveis de Cores */
:root {
  --primary-color: #1a4d8c; /* Azul Escuro */
  --secondary-color: #4CAF50; /* Verde Principal (Gráfico) - Agora menos usado, pois as cores são dinâmicas */
  --accent-color: #007bff; /* Azul Claro/Ação */
  --bg-light: #f0f4f8; /* Fundo Suave */
  --bg-card: white;
  --text-dark: #333;
  --text-light: #555;
}

.app-container {
  font-family: 'Arial', sans-serif;
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: var(--bg-light); /* Fundo mais suave */
  min-height: 100vh;
}

h1 {
  color: var(--primary-color);
  text-align: center;
  margin-top: 25px;
  margin-bottom: 5px;
  font-size: 2.5em;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.data-note {
  text-align: center;
  font-style: italic;
  color: var(--text-light);
  margin-bottom: 35px;
  font-size: 0.9em;
  padding: 0 10px;
}

.section-title {
  color: var(--text-dark);
  border-bottom: 3px solid var(--accent-color); /* Destaque azul claro */
  padding-bottom: 8px;
  margin-top: 40px;
  margin-bottom: 25px;
  font-size: 1.8em;
  font-weight: 600;
  text-align: center; /* NOVO: Centraliza o texto do título da seção */
}

.subtitle {
  color: var(--primary-color);
  margin-top: 25px;
  margin-bottom: 15px;
  font-size: 1.3em;
  font-weight: 500;
}

/* --- Tabs Navigation --- */
.tabs-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.tab-button {
  padding: 12px 25px;
  border: none;
  border-radius: 25px; /* Mais arredondado */
  cursor: pointer;
  background-color: var(--bg-card); 
  color: var(--primary-color);
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  font-size: 1em;
}

.tab-button:hover {
  background-color: #e0e7ff;
  box-shadow: 0 6px 10px rgba(0,0,0,0.15);
}

.tab-button.active {
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 8px 15px rgba(26, 77, 140, 0.4); /* Sombra temática mais forte */
  transform: translateY(-2px);
}

.tab-button:active {
  transform: translateY(0);
}

/* --- Table Styling --- */
.table-container {
  overflow-x: auto;
  padding: 0; /* Remove padding interno para o card */
  background-color: var(--bg-card);
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1); /* Sombra mais profunda */
  margin-bottom: 40px;
  border: 1px solid #e0e7ff; /* Borda suave */
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  padding: 14px 20px;
  text-align: left;
  border-bottom: 1px solid #f0f4f8; /* Linhas mais claras */
}

table thead th {
  background-color: var(--primary-color);
  color: white;
  text-transform: uppercase;
  font-size: 0.85em;
  letter-spacing: 1px;
  font-weight: 700;
}
table thead tr th:first-child {
  border-top-left-radius: 12px;
}
table thead tr th:last-child {
  border-top-right-radius: 12px;
}


table tbody tr:nth-child(even) {
  background-color: var(--bg-light); /* Cor de linha alternada */
}

table tbody tr:hover {
  background-color: #e6f0ff; /* Destaque ao passar o mouse */
  cursor: default;
}

/* Badge de Ranking */
.rank-badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.85em;
  min-width: 40px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.gold {
  background: linear-gradient(145deg, #FFD700, #FFA500);
  color: #333;
}
.silver {
  background: linear-gradient(145deg, #C0C0C0, #A9A9A9);
  color: #333;
}
.bronze {
  background: linear-gradient(145deg, #CD7F32, #B87333);
  color: white;
}
.default {
  background-color: #eee;
  color: #555;
}
.rank-cell {
  width: 70px;
}

/* --- Novo Estilo: Tags de Itens --- */
.item-tags-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Espaçamento entre as tags */
}

.item-tag {
  color: white;
  font-size: 0.85em;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 15px; /* Formato de pílula */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  white-space: nowrap; /* Garante que a tag não quebre */
}
/* --- Fim: Tags de Itens --- */

/* --- Gráfico Simples de Barras --- */
.bar-chart-container {
  background-color: var(--bg-card);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.bar-item {
  margin-bottom: 18px;
}

.bar-label {
  font-size: 1em;
  margin-bottom: 5px;
  color: var(--text-dark);
  font-weight: 500;
}

.bar-wrapper {
  background-color: #e0e7ff;
  border-radius: 8px;
  height: 30px; /* Maior altura */
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
}

.bar {
  height: 100%;
  /* REMOVIDO: O gradiente padrão. A cor agora é definida inline no componente ItemStats */
  transition: width 0.8s ease-out;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 30px;
  font-size: 1.1em;
}

/* --- Responsividade (Mobile First) --- */
@media screen and (max-width: 768px) {
  h1 {
    font-size: 2em;
  }
  .section-title {
    font-size: 1.6em;
  }
  .tabs-container {
    flex-direction: column;
    gap: 10px;
  }
  .tab-button {
    width: 95%;
    margin: 0 auto;
  }

  /* Esconder cabeçalhos da tabela e usar atributos data-label */
  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
    margin-bottom: 15px;
    border-radius: 10px;
    overflow: hidden;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 55%; /* AJUSTADO: Aumenta o espaço para o rótulo para evitar sobreposição */
    text-align: right;
    font-size: 1em;
  }
  
  /* Mantém as tags alinhadas à direita no celular, mas dentro da célula */
  .item-tags-cell {
    justify-content: flex-end;
    padding-left: 55% !important; /* AJUSTADO: Alinha com o novo padding do TD */
  }

  td:before {
    content: attr(data-label);
    left: 15px;
    width: 50%; /* AJUSTADO: Aumenta a largura do rótulo */
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    color: var(--primary-color);
    text-align: left;
  }
  
  /* Ajuste para células de ranking e nome */
  .rank-cell {
    width: 100%;
    text-align: center !important;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 1px solid #ccc;
    background-color: #e0e7ff;
  }
  .rank-cell:before { content: ""; } /* Remove o label do mobile */
  
  .table-container {
    padding: 0;
  }
  .bar-chart-container {
    padding: 20px;
  }
}
`;

// Aplica os estilos no DOM ao carregar o componente principal
const StyleInjector = () => (
  <style dangerouslySetInnerHTML={{ __html: styles }} />
);

// O componente principal deve ser exportado (padrão React)
export default function MainApp() {
  return (
    <>
      <StyleInjector />
      <App />
    </>
  );
}
