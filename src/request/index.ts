import http from './axios'

export async function fromGoogle() {
  // edit DETECT_FORM_XXX variables from .env.local
  const { data } = await http.get(process.env.REACT_APP_FROM_GOOGLE as string)
  return data
}

export async function fromUniversal() {
  const { data } = await http.get(
    process.env.REACT_APP_FROM_UNIVERSAL as string
  )
  return data
}
