export type Book = {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
  createdAt?: string;
  updatedAt?: string;
};

export type BooksResponse = {
  count: number;
  data: Book[];
};
