class Vertex {
    private PVector position;

    public void Vertex( PVector position )
    {    
        this.position = position;
    }

    public void Vertex( float x, float y )
    {    
        if( x < 0 || y < 0 ) throw new IllegalArgumentException();
        this( new PVector( x, y ) );
    }

    public PVector getPosition(){
        return this.position;
    }

    public String toString(){
        return "Vertex(" + this.position.x + ", " + this.position.y + " )";
    }
}