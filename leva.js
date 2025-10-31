
  // Configuração do Supabase
const SUPABASE_URL = "https://umqbfsutwdpwbukbagpd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtcWJmc3V0d2Rwd2J1a2JhZ3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NTY4MjEsImV4cCI6MjA3NzQzMjgyMX0.B2XhT3xKVJsv4AaBFyXiMy--9ZaazE4gLsEojocnguA";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // Pega o número da URL (ex: /5 → "5")
const path = window.location.pathname; 
const id = path.split("/").pop();

// Função para buscar o link no banco
async function buscarLink() {
  if (!id) return console.log("Nenhum ID encontrado na URL.");

  const { data, error } = await db
  .from("links")
  .select("url")
  .eq("id", id)
  .eq("ativo", true)   // só pega links ativos
  .maybeSingle();


  if (error || !data) {
    console.error("Erro ou link não encontrado:", error);
    document.body.innerHTML = "<h2>Link inválido ou não encontrado.</h2>";
    return;
  }

  // Redireciona
  window.location.href = data.url;
}

buscarLink();

