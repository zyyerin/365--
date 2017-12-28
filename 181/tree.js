let t = 0;

function Tree() {
  this.leaves = [];
  this.branches = [];

  for (let i = 50; i < height-50; i+=2) {
    let y = i;
    t += 0.06;
    this.leaves.push(new Leaf(noise(t)*width, y));
  }

  let pos = createVector(width/2, 0);
  let dir = createVector(1, 1);

  let root = new Branch(null, pos, dir);
  this.branches.push(root);
  let current = root;
  let found = false;

  while (!found) {
    for (let i = 0; i < this.leaves.length; i++) {
      let d = p5.Vector.dist(current.pos, this.leaves[i].pos);
      if (d < max_dist) {
        found = true;
      }
    }
    if (!found) {
      let branch = current.next();
      current = branch;
      this.branches.push(current);
    }
  }

  this.grow = function() {
    for (let i = 0; i < this.leaves.length; i++) {
      let leaf = this.leaves[i];
      let closestBranch = null;
      let record = max_dist;
      for (let j = 0; j < this.branches.length; j++) {
        let branch = this.branches[j];
        let d = p5.Vector.dist(leaf.pos, branch.pos);
        if (d < min_dist) {
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if (d < record) {
          closestBranch = branch;
          record = d;
        }
      }

      if (closestBranch != null) {
        let newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
        newDir.normalize();
        closestBranch.dir.add(newDir);
        closestBranch.count++;
      }
    }

    for (let i = this.leaves.length - 1; i >= 0; i--) {
      if (this.leaves[i].reached) {
        this.leaves.splice(i, 1);
      }
    }

    for (let i = this.branches.length - 1; i >= 0; i--) {
      let branch = this.branches[i];
      if (branch.count > 0) {
        branch.dir.div(branch.count + 1);
        this.branches.push(branch.next());
        branch.reset();
      }
    }
  }

  this.show = function() {
    for (let i = 0; i < this.leaves.length; i++) {
      this.leaves[i].show();
    }

    for (let i = 0; i < this.branches.length; i++) {
      this.branches[i].show();
    }

  }

}
