export interface CreateUserDto extends Readonly<CreateUserDto> {
  name: string;
  email: string;
  password: string;
}
