import ky from 'ky'

export const api = ky.create({
  credentials: 'same-origin', // necessário para enviar cookies (ex: sessão do NextAuth)
  headers: {
    'Content-Type': 'application/json',
  },
})
