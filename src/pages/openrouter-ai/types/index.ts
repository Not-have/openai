export interface IPropsAvatar {
  type: 'assistant' | 'user'
}

export interface IPropsNickname extends IPropsAvatar {
  label?: string
}

export interface IPropsInput {
  loading?: boolean;
  onClick?: (e: string) =>  void;
}