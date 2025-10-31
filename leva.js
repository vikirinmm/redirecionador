import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/supabase.js';

  const SUPABASE_URL = "https://umqbfsutwdpwbukbagpd.supabase.co";
  const SUPABASE_KEY = "SUA_KEY_AQUI";

  const db = createClient(SUPABASE_URL, SUPABASE_KEY);

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

    // Redireciona
    window.location.href = data.url;
  }

  buscarLink();
