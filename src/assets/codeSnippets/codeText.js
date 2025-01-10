export const pbds = `template <class T> using oset = tree<T, null_type,
less<T>, rb_tree_tag,tree_order_statistics_node_update>;
//defining template for pbds multiset
template <class T> using oset_d = tree<T, null_type,
less_equal<T>, rb_tree_tag,tree_order_statistics_node_update>;
//*s.find_by_order(k):
//returns the element present at index k if present in set(index as if the set was an array)
//s.order_of_key(ele):
//return index of element 'ele' if present in set
//always use priority queue for dijkstra(not set)
//for pbds multiset, lower and upper bound are switched`;

export const binpow = `int binpow(int a,int b){
	int ans=1;
	while(b){
		if(b&1)ans=(ans*a);
		a=(a*a);
		b>>=1;
	}
	return ans;
}`

export const segTree = `/find max in log(N)
//segment tree
const int N=1e5;
vi seg(4*N,0);
//0-based seg tree
void build(vi &a,int idx,int low,int high){
	if(low==high){//base case when there is only one element in segment tree
		seg[idx]=a[low];
		return;
	}
	int mid=(low+high)/2;
	build(a,2*idx+1,low,mid);
	build(a,2*idx+2,mid+1,high);
	//seg[idx] is maximum of both left and right nodes
	seg[idx] = max(seg[2*idx+1],seg[2*idx+2]);
}
int rmq(vi &a,int idx,int low,int high,int l,int r){
	//if given node of segment tree completely lies within (l,r)
	if(low>=l && high<=r){
		return seg[idx];
	}
	//if given node of segment tree i disjoint with (l,r)
	if(low>=r || high<=l){
		return LLONG_MIN;
	}
	//else some part lies and some part doesn't
	//call for both left and right nodes
	int mid=(low+high)/2;
	int leftnode = rmq(a,2*idx+1,low,mid,l,r);//similar processing as above in left side
	int rightnode = rmq(a,2*idx+2,mid+1,high,l,r);//and fpr right side
	//you need to return max of both sides
	return max(leftnode,rightnode);
}`;

export const orQueries = `//precomputation takes O(bits*n) time
const int N=1e5+10;
vi a;
//int p[bits][N];
//p[i][j] means the number of bits set in ith position 
//taking numbers till jth index in array
int n;
const int bits=19;
void precompute(vvi &p){
	fr(i,0,bits){
		p[i][0]=(a[0]>>i)&1;
		fr(j,1,n-1){
			p[i][j]=(a[j]>>i)&1;
			p[i][j]+=p[i][j-1];
		}
	}
}
int rq(vvi &p,int l,int r){
	int ans=0;
	fr(i,0,bits){
		int cnt=p[i][r];
		if(l!=0)cnt-=p[i][l-1];
		if(cnt>0)ans=ans|(1<<i);
	}
	return ans;
}`

export const DSU = `struct DSU{
	vi s,par;
	DSU(int n){
		s.resize(n);
		par.resize(n);
		fr(i,0,n-1){
			par[i]=i;
			s[i]=1;
		}
	}
	int find(int x){
		return x = (x==par[x] ? x : find(par[x]));
	}
	bool merge(int u,int v){
		u = find(u);
		v = find(v);
		if(v==u)return 0;
		if(s[u] > s[v]){
			swap(u,v);
			swap(s[u],s[v]);
		}
		s[v] += s[u];
		par[u] = v;
		return 1;
	}
};`;