export const filterIdFromName = (name: string,id:string) => {
  return name.split(' ').filter(word => !word.includes(id)).join(' ')
}