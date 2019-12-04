from skaf.models import (commit, rollback, 
    persist, delete as delete_object, save, object_as_dict)
from sqlalchemy.exc import IntegrityError

class RestObject(object):
    def __init__(self, request):
        self.request = request
    
    def save(self, object, raise_integrity_error=False):
        try: 
            obj_copy, id_ = save(obj)
            if id_:
                self.request.response.location = f"{self.request.url}/{id_}"
        except IntegrityError as e:
            if raise_integrity_error: 
                raise e
            else:
                self.log_critical_and_raise(e)
                    
        
    @staticmethod
    def log_critical_and_raise(self, e):
        log.critical(e, exc_info(True))
        raise HTTPInternalServerError