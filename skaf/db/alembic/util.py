from alembic import op
from sqlalchemy import text, MetaData

from skaf.lib.exceptions.alembic import OfflineModeException


def unsafe_insert(tablename, data):
    """Creates an unsafe SQL statement

    Inserts the key value pairs of the given data dictionary into the given
    table.
    """

    columns = ""
    values = ""

    for key in data:
        columns += ",{} ".format(key)
        values += ",:{} ".format(key)

    columns = columns[1:]
    values = values[1:]

    op.get_bind().execute(
        text("insert into {tablename}({columns}) values ({values})".format(
            tablename=tablename, columns=columns, values=values
        )), **data)


def get_table_metadata_from_db(table_name, bind=None):
    if not bind:
        bind = op.get_bind()
    metadata = MetaData()
    try:
        metadata.reflect(bind)
    except AttributeError:
        raise OfflineModeException()
    return metadata.tables[table_name]
