export interface NewsType {
  publishDate: string;
  newsCategory: string[];
  title: string;
  description: string;
  imgUrl: string;
  isBookmarked: boolean;
  isNew: boolean;
  id: string;
  newsUrl: string;
  isNewsBookmarked?: (id:string,isbookmarked:boolean) => void;
  getLastReadNews?: (newsId) => void;
}

export interface filters {
  newsAgency?: [
    id ?:string ,
    displayName?:string,
    label?:string,
    newsCategory?:any[]

  ];
  newsCategory?: [
    id ?:string ,
    displayName?:string,
    label?:string,
  ];
}

export interface filterQueryTypes {
  searchKeyword?: string;
  agency?: any;
  newsCategory?: any;
}
