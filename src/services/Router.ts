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

  public delete(route: string, controllerMethod: string) {
    this.add('delete', route, controllerMethod)
  }

  public resources(route: string, controllerName: string) {
    this.get(route, `${controllerName}.index`)
    this.get(`${route}/:id`, `${controllerName}.show`)
    this.post(route, `${controllerName}.create`)
    this.update(`${route}/:id`, `${controllerName}.update`)
    this.delete(`${route}/:id`, `${controllerName}.delete`)
  }

  public listen() {
    this._mount()
    return this.router
  }

  private _mount() {
    this.routes.forEach(({ method, route, controllerMethod }) => {
      const [name, action] = controllerMethod.split('.')
      // @ts-ignore
      const Controller = this.Controllers[name]
      if (Controller.permits.includes(action)) {
        // @ts-ignore
        this.router[method](
          route,
          useControllerAction(new Controller(), action)
        )
      }
    })
  }

}

function useControllerAction(Controller: any, controllerAction: string) {
  return (...args: any) => {
    // @ts-ignore
    return Controller[controllerAction](...args)
  }
}
