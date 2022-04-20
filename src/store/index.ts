export class Store<T extends { id: string }> {
  store: T[] = []

  add(param: T) {
    this.store.push(param)
    return false
  }

  find(id: T['id']) {
    return this.store.find((currentParam) => currentParam.id === id)
  }
}
