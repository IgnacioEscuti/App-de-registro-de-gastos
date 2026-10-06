const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MENOS = '−';

// A mano y no con toLocaleString('es-AR'): el locale español no agrupa
// números de 4 cifras (daría "3200" en vez de "3.200").
export function formatearNumero(valor, decimales = 2) {
  const [entero, centavos] = Math.abs(valor).toFixed(decimales).split('.');
  const enteroConPuntos = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return centavos ? `${enteroConPuntos},${centavos}` : enteroConPuntos;
}

export function formatearPesos(valor, { decimalesOpcionales = false } = {}) {
  const decimales = decimalesOpcionales && Number.isInteger(valor) ? 0 : 2;
  const signo = valor < 0 ? MENOS : '';
  return `${signo}$ ${formatearNumero(valor, decimales)}`;
}

export function formatearPesosConSigno(valor) {
  const signo = valor < 0 ? MENOS : '+';
  return `${signo} $ ${formatearNumero(valor)}`;
}

export function formatearFechaCorta(fecha) {
  return `${fecha.getDate()} ${MESES_CORTOS[fecha.getMonth()]}`;
}

export function obtenerPrimerNombre(nombre) {
  return nombre.trim().split(/\s+/)[0];
}

export function obtenerIniciales(nombre) {
  const palabras = nombre.trim().split(/\s+/);
  const primera = palabras[0][0];
  const ultima = palabras.length > 1 ? palabras[palabras.length - 1][0] : '';
  return `${primera}${ultima}`.toUpperCase();
}
