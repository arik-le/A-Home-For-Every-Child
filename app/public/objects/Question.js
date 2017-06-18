var Question=function()
{
    var create=function(q,n)
    {
        return{ question:q,numOfvalues:n}
    }
    return {create:create}
}();