export interface IDataFetch {
  role: 'assistant' | 'user';
  content: string;
}

export interface IParamsFetch extends IDataFetch {}