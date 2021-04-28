import { Get, Route } from "tsoa";

interface HealthResponse {
  status: string;
}

@Route("health")
export default class HealthController {
  @Get("/")
  public async getMessage(): Promise<HealthResponse> {
    return {
      status: "ok",
    };
  }
}
