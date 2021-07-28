import React from 'react';

class Datatable extends React.Component {
	handleClick = (type, id) => {
		this.props.handleUpdateEmployeeList(type, id);
	}

  render () {
		const { data } = this.props;

    return (
      <div className="">
        <table className="table text-center border">
					<thead className="thead-light">
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{data && data.map((i) => (
							<tr key={i.id}>
								<td>{i.name || '--'}</td>
								<td>{i.email || '--'}</td>
								<td className="d-inline-flex">
									<p onClick={() => this.handleClick('edit', i.id)} className="text-primary cursor-pointer">
										<u>Edit&nbsp;</u>
									</p>
									<p onClick={() => this.handleClick('delete', i.id)} className="text-danger cursor-pointer">
										<u>&nbsp;Delete</u>
									</p>
								</td>
							</tr>
						))}
					</tbody>
				</table>
      </div>
    );
  }
}

export { Datatable };