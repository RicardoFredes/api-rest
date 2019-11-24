import { Router as ExpressRouter } from 'express'

interface IRouteType {
  method: string
  route: string
  controllerMethod: string
}

export default class Router {
  private Controllers: object
  private router: ExpressRouter
  private routes: IRouteType[]

  constructor(Controllers: object) {
    this.Controllers = Controllers
    this.router = ExpressRouter()
    this.routes = []
  }

  public add(method: string, route: string, controllerMethod: string) {
    this.routes.push({ method, route, controllerMethod })
  }

  public get(route: string, controllerMethod: string) {
    this.add('get', route, controllerMethod)
  }

  public post(route: string, controllerMethod: string) {
    this.add('post', route, controllerMethod)
  }

  public update(route: string, controllerMethod: string) {
    this.add('put', route, controllerMethod)
  }

  public destroy(route: string, controllerMethod: string) {
    this.add('delete', route, controllerMethod)
  }

  public listen() {
    this._mount()
    return this.router
  }

  private _mount() {
    this.routes.forEach(({ method, route, controllerMethod }) => {
      // @ts-ignore
      this.router[method](
        route,
        useController(this.Controllers, controllerMethod)
      )
    })
  }
}

function useController(Controllers: object, controllerMethod: string) {
  const [name, method] = controllerMethod.split('.')
  return (...args: any) => {
    // @ts-ignore
    const Controller = Controllers[name]
    return new Controller()[method](...args)
  }
}
