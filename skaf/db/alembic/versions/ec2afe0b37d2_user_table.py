import codercore
import sqlalchemy as sa
from alembic import context, op


"""user table

Revision ID: ec2afe0b37d2
Revises: 
Create Date: 2019-12-04 17:23:18.551355

"""

# revision identifiers, used by Alembic.
revision = 'ec2afe0b37d2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
        sa.Column('id', codercore.db.type.UUID(length=36), nullable=False),
        sa.Column('email', sa.String(length=500), nullable=False),
        sa.Column('password_hash', sa.String(length=119), nullable=False),
        sa.Column('password_salt', sa.String(length=29), nullable=False),
        sa.Column('date_created', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('third_party_integration',
        sa.Column('date_created', sa.DateTime(), nullable=False),
        sa.Column('third_party_id', sa.String(length=200), nullable=False),
        sa.Column('provider', sa.Enum('Facebook', name='third_party_provider'),
                nullable=False),
        sa.Column('user_id', codercore.db.type.UUID(length=36),
                nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['user.id']),
        sa.PrimaryKeyConstraint('third_party_id', 'provider')
    )
    # ### end Alembic commands ###

    if context.config.get_main_option("environment") == "develop":
        create_dummy_data()


def create_dummy_data():
    pass


def downgrade():
    if context.config.get_main_option("environment") == "develop":
        remove_dummy_data()

    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('third_party_integration')
    # ### end Alembic commands ###


def remove_dummy_data():
    pass