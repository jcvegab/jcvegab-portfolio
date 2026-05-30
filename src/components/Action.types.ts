export type ActionData = {
  url: string;
  label: string;
  style?: 'link' | 'button' | 'icon';
  icon?: string;
  new_window?: boolean;
  no_follow?: boolean;
};
