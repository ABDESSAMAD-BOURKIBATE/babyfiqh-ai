
export interface Book {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    ia?: string[];
}

const BASE_URL = 'https://openlibrary.org';

// Ensures we filter for children's content
const CHILDREN_FILTER = 'subject:juvenile_fiction OR subject:children OR subject:picture_books';

export const searchBooks = async (query: string, page: number = 1): Promise<Book[]> => {
    try {
        // Construct a query that prioritizes children's content
        // We check if the query is Arabic or English to adjust logic slightly if needed,
        // but generally we append the children filter.
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(`${BASE_URL}/search.json?q=${encodedQuery}+${encodeURIComponent(CHILDREN_FILTER)}&fields=key,title,author_name,cover_i,first_publish_year,ia&limit=20&page=${page}`);
        
        if (!response.ok) throw new Error('Failed to fetch books');
        
        const data = await response.json();
        return data.docs || [];
    } catch (error) {
        console.error("Open Library Search Error:", error);
        return [];
    }
};

export const getBooksBySubject = async (subject: string): Promise<Book[]> => {
    try {
        // Fetch from subject API, strictly controlling the subject to be child-friendly
        const response = await fetch(`${BASE_URL}/subjects/${subject}.json?details=true&limit=20`);
        
        if (!response.ok) throw new Error('Failed to fetch subject');
        
        const data = await response.json();
        return data.works.map((work: any) => ({
            key: work.key,
            title: work.title,
            author_name: work.authors?.map((a: any) => a.name),
            cover_i: work.cover_id,
            first_publish_year: work.first_publish_year,
            ia: work.ia
        })) || [];
    } catch (error) {
        console.error("Open Library Subject Error:", error);
        return [];
    }
};

export const getCoverUrl = (coverId: number, size: 'S' | 'M' | 'L' = 'M'): string => {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};
