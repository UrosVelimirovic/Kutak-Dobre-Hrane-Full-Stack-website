export class CanvasObject{

  isOriginal!: boolean;
  type!: string;
  x!: number;
  y!: number;
  radius!: number;
  width!: number;
  height!: number;
  ordNumber!: number;
  fillStyle!: string;
  brojLjudi!: number;

  constructor(obj: any) {
    this.isOriginal = obj.isOriginal;
    this.type = obj.type;
    this.x = obj.x;
    this.y = obj.y;
    this.radius = obj.radius;
    this.width = obj.width;
    this.height = obj.height;
    this.ordNumber = obj.ordNumber;
    this.fillStyle = obj.fillStyle;
    this.brojLjudi = obj.brojLjudi;
  }
}
