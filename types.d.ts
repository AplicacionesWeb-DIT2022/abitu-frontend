type Curso = {
  id: number,
  nombre: string,
  descripcion: string,
  duracion: string,
  precio: string,
  dificultad: string,
  categoria_id: number,
  created_at: string,
  updated_at: string,
  categoria: Categoria
};
  
type Categoria = {
  id: number,
  nombre: string,
  created_at: string,
  updated_at: string
}