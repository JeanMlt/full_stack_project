export default class DogFactService {
    static async getAll() {
        try {
            const response = await fetch(`http://localhost:8000/dog-facts-all`, { method: 'GET' });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.detail);
            }
            const result = await response.json();
            return result.message
       }catch (error) {
            console.error(error);
            throw error
            }
    }

    static async get(id: number | string) {
        try {
            const response = await fetch(`http://localhost:8000/dog-facts/${id}`, { method: 'GET' });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.detail);
            }
            const result = await response.json();
            return result.message
        }catch (error) {
            console.error(error);
            throw error
        }
    }
  
    static async post() {
        try {
            const response = await fetch('http://localhost:8000/dog-facts', { method: 'POST' });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.detail);
            }
            const result = await response.json();
            return result.message
        }catch (error) {
            console.error(error);
            throw error
        }
    }
  
    static async put(id: number | string) {
        try {
            const response = await fetch(`http://localhost:8000/dog-facts/${id}`,{method: 'PUT',headers: {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify({ test: 'test' })});
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.detail);
            }
            const result = await response.json();
            return result.message
        }catch (error) {
            console.error(error);
            throw error
        }
    }

    static async delete(id : number | string) {
        try {
            const response = await fetch(`http://localhost:8000/dog-facts/${id}`,{method: 'DELETE',headers: {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify({ test: 'test' })});
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.detail);
            }
            const result = await response.json();
            return result.message
        }catch (error) {
            console.error(error);
            throw error
        }
    }
}