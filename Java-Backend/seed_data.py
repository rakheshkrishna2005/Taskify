#!/usr/bin/env python3
"""
Script to seed sample data into the todo_db database
"""

import psycopg2
from datetime import datetime

# Database connection parameters
DB_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'database': 'todo_db',
    'user': 'postgres',
    'password': 'prk'
}

# Sample todos to insert
SAMPLE_TODOS = [
    {
        'title': 'Complete project documentation',
        'description': 'Write comprehensive documentation for the Todo API project',
        'completed': False
    },
    {
        'title': 'Review pull requests',
        'description': 'Review and merge pending pull requests from team members',
        'completed': False
    },
    {
        'title': 'Update dependencies',
        'description': 'Update Spring Boot and other dependencies to latest versions',
        'completed': True
    },
    {
        'title': 'Write unit tests',
        'description': 'Add unit tests for service and controller layers',
        'completed': False
    },
    {
        'title': 'Setup CI/CD pipeline',
        'description': 'Configure GitHub Actions for automated testing and deployment',
        'completed': False
    },
    {
        'title': 'Database optimization',
        'description': 'Add indexes and optimize database queries',
        'completed': True
    },
    {
        'title': 'API documentation',
        'description': 'Create Swagger/OpenAPI documentation for all endpoints',
        'completed': False
    },
    {
        'title': 'Security audit',
        'description': 'Perform security review and implement best practices',
        'completed': False
    },
    {
        'title': 'Performance testing',
        'description': 'Run load tests and optimize application performance',
        'completed': True
    },
    {
        'title': 'Docker setup',
        'description': 'Create Dockerfile and docker-compose for easy deployment',
        'completed': False
    }
]


def create_table_if_not_exists(cursor):
    """Create the todos table if it doesn't exist"""
    create_table_query = """
    CREATE TABLE IF NOT EXISTS todos (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    """
    cursor.execute(create_table_query)
    print("✓ Table 'todos' is ready")


def clear_existing_data(cursor):
    """Clear existing data from todos table"""
    cursor.execute("DELETE FROM todos;")
    cursor.execute("ALTER SEQUENCE todos_id_seq RESTART WITH 1;")
    print("✓ Cleared existing data")


def insert_sample_data(cursor):
    """Insert sample todos into the database"""
    insert_query = """
    INSERT INTO todos (title, description, completed, created_at, updated_at)
    VALUES (%s, %s, %s, %s, %s)
    RETURNING id;
    """
    
    inserted_count = 0
    current_time = datetime.now()
    
    for todo in SAMPLE_TODOS:
        cursor.execute(
            insert_query,
            (
                todo['title'],
                todo['description'],
                todo['completed'],
                current_time,
                current_time
            )
        )
        todo_id = cursor.fetchone()[0]
        status = "✓" if todo['completed'] else "☐"
        print(f"  {status} [{todo_id}] {todo['title']}")
        inserted_count += 1
    
    return inserted_count


def main():
    """Main function to seed the database"""
    print("=" * 60)
    print("Todo Database Seeding Script")
    print("=" * 60)
    
    connection = None
    try:
        # Connect to database
        print("\nConnecting to database...")
        connection = psycopg2.connect(**DB_CONFIG)
        cursor = connection.cursor()
        print("✓ Connected to PostgreSQL database")
        
        # Create table if needed
        print("\nSetting up database table...")
        create_table_if_not_exists(cursor)
        
        # Clear existing data
        print("\nClearing existing data...")
        clear_existing_data(cursor)
        
        # Insert sample data
        print("\nInserting sample todos:")
        inserted_count = insert_sample_data(cursor)
        
        # Commit changes
        connection.commit()
        
        # Summary
        print("\n" + "=" * 60)
        print(f"✓ Successfully inserted {inserted_count} todos!")
        print("=" * 60)
        
        # Show statistics
        cursor.execute("SELECT COUNT(*) FROM todos WHERE completed = TRUE;")
        completed_count = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM todos WHERE completed = FALSE;")
        pending_count = cursor.fetchone()[0]
        
        print(f"\nDatabase Statistics:")
        print(f"  Total todos:     {inserted_count}")
        print(f"  Completed:       {completed_count}")
        print(f"  Pending:         {pending_count}")
        print("\nYou can now start your Spring Boot application!")
        print("Run: mvn spring-boot:run\n")
        
    except psycopg2.Error as e:
        print(f"\n✗ Database error: {e}")
        if connection:
            connection.rollback()
        return 1
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        if connection:
            connection.rollback()
        return 1
        
    finally:
        if connection:
            cursor.close()
            connection.close()
            print("Connection closed.")
    
    return 0


if __name__ == "__main__":
    exit(main())
