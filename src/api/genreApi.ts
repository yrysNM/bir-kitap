import useApi from "../hook/useApi";

type genre = {
    id:    string;
    title: string;
}

export interface IGenre extends IResponse {
    data: genre[]
}

export function GenreAPI() {
    const {res, error, fetchData} = useApi<IGenre>('/genre/list', "POST");

    return {
        res, 
        error, 
        fetchData,
    }
}
