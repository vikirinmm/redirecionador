const SUPABASE_URL = "https://umqbfsutwdpwbukbagpd.supabase.co";
const SUPABASE_KEY = "SUA_KEY_AQUI";
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
    .eq("ativo", true)
    .maybeSingle();

  if (!data) {
    console.error("Erro ou link não encontrado:", error);
    document.body.innerHTML = "<h2>Link inválido ou não encontrado.</h2>";
    return;
  }

  window.location.href = data.url;
}

buscarLink();

