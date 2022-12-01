package retriever

import (
	"context"

	"github.com/grafana/grafana/pkg/infra/kvstore"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/services/apikey"
	"github.com/grafana/grafana/pkg/services/org"
	"github.com/grafana/grafana/pkg/services/serviceaccounts"
	"github.com/grafana/grafana/pkg/services/serviceaccounts/database"
	"github.com/grafana/grafana/pkg/services/sqlstore"
)

type ServiceAccountRetriever interface {
	RetrieveServiceAccount(ctx context.Context, orgID, serviceAccountID int64) (*serviceaccounts.ServiceAccountProfileDTO, error)
}

// ServiceAccountRetriever is the service that manages service accounts.
type Service struct {
	store  *database.ServiceAccountsStoreImpl
	logger log.Logger
}

func ProvideService(
	store *sqlstore.SQLStore,
	apiKeyService apikey.Service,
	kvStore kvstore.KVStore,
	orgService org.Service,
) *Service {
	serviceAccountsStore := database.ProvideServiceAccountsStore(
		store,
		apiKeyService,
		kvStore,
		orgService,
	)
	return &Service{
		store:  serviceAccountsStore,
		logger: log.New("serviceaccountretriever"),
	}
}

// NewServiceAccountRetrieverService creates a new ServiceAccountRetrieverService.
// func ProvideService(store ServiceAccountRetriever) *Service {
// 	return &Service{
// 		store:  store,
// 		logger: log.New("serviceaccountretriever"),
// 	}
// }

func (s *Service) RetrieveServiceAccount(ctx context.Context, orgID, serviceAccountID int64) (*serviceaccounts.ServiceAccountProfileDTO, error) {
	return s.store.RetrieveServiceAccount(ctx, orgID, serviceAccountID)
}
