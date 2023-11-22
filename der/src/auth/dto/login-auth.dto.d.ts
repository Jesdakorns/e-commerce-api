export interface LoginDTO {
    token: string;
    email: string;
}
export declare enum Mode {
    GOOGLE = "google"
}
export declare class LoginFormDto {
    email: string;
    password: string;
}
export declare class LoginGoogleFormDto {
    id: string;
    name: string;
    email: string;
    image: string;
}
