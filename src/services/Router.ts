import { Router as ExpressRouter } from "express"

interface RouteType {
  method: string
  route: string
  controllerMethod: string
}

export default class Router {
  Controllers: object
  router: ExpressRouter
  routes: Array<RouteType>

  constructor(Controllers: object) {
    this.Controllers = Controllers
    this.router = ExpressRouter()
    this.routes = []
  }

  add(method: string, route: string, controllerMethod: string) {
    this.routes.push({ method, route, controllerMethod })
  }

  get(...args: Array<string>) {
    // @ts-ignore
    this.add('get', ...args)
  }

  post(...args: Array<string>) {
    // @ts-ignore
    this.add('post', ...args)
  }

  update(...args: Array<string>) {
    // @ts-ignore
    this.add('put', ...args)
  }

  destroy(...args: Array<string>) {
    // @ts-ignore
    this.add('delete', ...args)
  }

  _mount() {
    this.routes.forEach(({ method, route, controllerMethod }) => {
      // @ts-ignore
      this.router[method](route, useController(this.Controllers, controllerMethod))
    })
  }

  listen() {
    this._mount()
    return this.router
  }

}

function useController(Controllers: object, controllerMethod: string) {
  const [name, method] = controllerMethod.split('.')
  return function(...args: any) {
    // @ts-ignore
    const Controller = Controllers[name]
    return new Controller()[method](...args)
  }
}
