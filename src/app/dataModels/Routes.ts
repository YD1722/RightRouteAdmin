export class Route{
  name:string;
  start:string;
  end:string;
  path:any[]; //pain in the back
  kml_path:string;
  reviews:{description:string,rating:number,user:string}[];
}
