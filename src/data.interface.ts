export interface Data{
    [id:string]:DataValue;
}

export interface DataValue{
    type: "text"|"checkbox"|"image";
    value: string | boolean;
}