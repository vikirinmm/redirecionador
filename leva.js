const SUPABASE_URL = "https://umqbfsutwdpwbukbagpd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtcWJmc3V0d2Rwd2J1a2JhZ3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NTY4MjEsImV4cCI6MjA3NzQzMjgyMX0.B2XhT3xKVJsv4AaBFyXiMy--9ZaazE4gLsEojocnguA";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY); // supabase já existe globalmente

async function buscarLink() {
  const path = window.location.pathname;
  const id = Number(path.split("/").pop());

  if (isNaN(id)) {
    document.body.innerHTML = "<h2>ID inválido na URL.</h2>";
    return;
  }

  const { data, error } = await db
    .from("links")
    .select("url")
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    console.error("Erro ou link não encontrado:", error);
    document.body.innerHTML = "<h2>Link inválido ou não encontrado.</h2>";
    return;
  }

  window.location.href = data.url;
}

buscarLink();

