class Edge {
    private Vertex from, to;
    private int weight;

    public void Edge( Vertex from, Vertex to, int weight ){
        this.from   = from;
        this.to     = to;
        this.weight = weight;
    }

    public int getWeight()
    {
        return this.weight;
    }

    public String toString(){
        return "Edge(" + from + ", " + to + ")"
    }


}