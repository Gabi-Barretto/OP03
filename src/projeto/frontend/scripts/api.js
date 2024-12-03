export async function fetchBlockData(blockId) {
    try {
      const response = await fetch(`/item/${blockId}`);
      if (!response.ok) throw new Error("Erro ao buscar dados do bloco.");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
}
  