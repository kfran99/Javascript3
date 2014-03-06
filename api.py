from flask import Flask, render_template, request, redirect, flash
import dataset

app = Flask(__name__)
app.secret_key = "Shhhhh!! Something Secret"
db = dataset.connect('sqlite:///database.db')

# Assign vars for our database tables
todo_item_table = db['todo_items']
todo_lists = db['todo_lists']

@app.route('/')
def index():
    return render_template('index.html', lists=todo_lists)

@app.route('/', methods=['POST'])
def index_post():
    #create a new list
    list_name = request.form.get('todo_list_name')
    todo_lists.insert(dict(list_name=list_name))

    # return all of the lists (including our new one)
    results = todo_lists.all()
    lists = [l for l in results]
    return render_template("todo_list_partial.html", lists=lists)
    

@app.route('/todo_lists/<int:id>')
def todo_list_show(id):
    items = todo_item_table.find(todo_list_id=id)
    items = [x for x in items]

    return render_template("todo_items_partial.html", items=items, id=id)

@app.route('/todo_lists/<int:id>', methods=["POST"])
def todo_item_create(id):
    #Create a new todo_item
    todo_item_table.insert(dict(task=request.form.get("task"), todo_list_id=id, done=False))
    
    #return all of the items for given list
    items = todo_item_table.find(todo_list_id=id)
    items = [x for x in items] 
    return render_template("todo-partial-martial.html", items=items)


@app.route('/todo_lists/poll')
def poll_for_lists():
    results = todo_lists.all()
    lists = [l for l in results]
    return render_template("todo_list_partial.html", lists=lists)


if __name__ == '__main__':
    app.run(debug=True)
